import Link from "../Models/linkModel.js";
import User from "../Models/userModel.js";


const LinkController = {
    getLink: async (req, res) => {
        try {
            const link = await Link.findOne({
                _id: req.params.id,
                _id: { $in: req.links }
            });
            if (!link)
                return res.status(404).json({ error: "Link not found" });

            res.status(200).json(link);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllLinks: async (req, res) => {
        try {
            const links = await Link.find({ _id: { $in: req.links } });
            if (!links)
                return res.status(404).json({ error: "Links not found" });

            res.status(200).json(links);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postLink: async (req, res) => {
        try {
            const { originalUrl, targetParamName } = req.body;
            if (!originalUrl)
                return res.status(400).json({ error: "Original URL is required" });

            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({ error: "User not found" });

            let link;
            if (!targetParamName)
                link = await Link.create({ originalUrl });
            else
                link = await Link.create({ originalUrl, targetParamName })

            if (!link)
                return res.status(404).json({ error: "Link not created" });


            user.links.push(link);
            await user.save();

            res.status(201).json(link);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putLink: async (req, res) => {
        try {

            const { originalUrl } = req.body;
            if (!originalUrl)
                return res.status(400).json({ error: "Original URL is required" });

            const link = await Link.findByIdAndUpdate
                (
                    {
                        _id: req.params.id,
                        _id: { $in: req.links }
                    },
                    { originalUrl },
                    { new: true }
                );

            if (!link)
                return res.status(404).json({ error: "Link not updated" });
            res.status(200).json(link);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteLink: async (req, res) => {
        try {
            const link = await Link.findByIdAndDelete(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not deleted" });
            res.status(200).json(link);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //target
    getLinkTargets: async (req, res) => {
        try {
            const link = await Link.findById(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not found" });
            const targets = link.targetValues;
            if (!targets)
                return res.status(404).json({ error: "Targets not found" });
            res.status(200).json(targets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postLinkTarget: async (req, res) => {
        try {
            const link = await Link.findById(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not found" });
            const { name, value } = req.body;
            const target = { name: name ?? "", value: value ?? "" };
            link.targetValues.push(target);

            await link.save();

            res.status(200).json(target);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putLinkTarget: async (req, res) => {
        try {
            const link = await Link.findById(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not found" });
            const { name, value } = req.body;
            const target = link.targetValues.id(req.params.targetId);
            if (!target)
                return res.status(404).json({ error: "Target not found" });

            target.name = name ?? target.name;
            target.value = value ?? target.value;
            await link.save();
            res.status(200).json(target);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteLinkTarget: async (req, res) => {
        try {
            const link = await Link.findById(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not found" });
            const target = link.targetValues.id(req.params.targetId);
            if (!target)
                return res.status(404).json({ error: "Target not found" });

            target.remove();
            await link.save();
            res.status(200).json(target);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getClicksBySource: async (req, res) => {
        try {
            const link = await Link.findById(
                {
                    _id: req.params.id,
                    _id: { $in: req.links }
                }
            );
            if (!link)
                return res.status(404).json({ error: "Link not found" });

            // 1. צור מיפוי בין value ל-name
            // link.targetValues הוא אובייקט שהמפתח בו הוא 屬 性 value והערך שלו הוא 屬 性 name
            const valueToName = {};
            link.targetValues.forEach(target => {
                valueToName[target.value] = target.name;
            });

            // 2. אובייקט לספירה לפי שם המקור
            const clicksBySourceName = {};
            valueToName.forEach(name => {
                clicksBySourceName[name] = 0;
            });

            // 3. מעבר על כל קליק וספירה לפי שם המקור
            link.clicks.forEach(click => {
                const value = click.targetParamValue;
                const name = valueToName[value] || "unknown";
                clicksBySourceName[name]++;
            });
            res.status(200).json(clicksBySourceName);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
export default LinkController;