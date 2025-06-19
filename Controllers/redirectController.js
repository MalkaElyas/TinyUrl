import Link from "../Models/linkModel.js";

const redirectController = {
    redirectLink: async (req, res) => {
        try {
            const link = await Link.findById(req.params.shortId);
            if (!link) {
                return res.status(404).json({ message: "Link not found" });
            }
            if(req.query[link.targetParamName]) {
                link.clicks.push({ insertedAt: new Date(), ipAddress: req.ip, targetParamValue: req.query[link.targetParamName] });
            }
            else {
                link.clicks.push({ insertedAt: new Date(), ipAddress: req.ip });
            }
            await link.save();
            return res.redirect(link.originalUrl);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default redirectController
