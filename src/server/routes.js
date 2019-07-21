const GoogleRecaptcha = require('google-recaptcha');
const googleRecaptcha = new GoogleRecaptcha(
    {
        secret: process.env.RECAPTCHA_PRIVATE_KEY,
    }
);

const admin = require('firebase-admin');
let serviceAccount = require('../../firestore_key.json');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://hovnokod-97f61.firebaseio.com'
});

const shitcodes = admin.firestore().collection('shitcodes');

const CATEGORIES = [
    'quotes',
    'java',
    'cpp',
    'javascript',
    'php',
    'python',
    'ruby',
    'html',
    'sql',
    'csharp',
    'vb',
    'perl',
    'bash',
    'delphi',
    'other',
];

const SITE_BASE = 'https://hovnokod.cz';

const generateSitemap = (req, res) => {
    let urlset = CATEGORIES.map(
        category => `
    <url>
        <loc>${SITE_BASE}/${category}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
    </url>`
    );

    let result = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
    <url>
        <loc>${SITE_BASE}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
    </url>
${urlset.join("\n")}
</urlset>
`.trim();

    res.set('Content-Type', 'application/xml;charset=utf-8');
    res.send(result);
};

const handleValidationError = (res, message) => {
    res.status(400);
    res.json({ status: 'error', message });
};

const validateStringRange = (str, min, max) => {
    return !!str && str.length >= min && str.length <= max;
};

const validateCategory = (category) => {
    return CATEGORIES.includes(category);
};

const handlePostCode = (req, res) => {
    googleRecaptcha.verify({response: req.body.recaptcha}, (error) => {
        if (error) {
            return handleValidationError(res, error);
        }

        if (!validateCategory(req.body.category)) {
            return handleValidationError(res, 'Invalid category');
        }

        if (!validateStringRange(req.body.code, 1, 5000)) {
            return handleValidationError(res, 'Invalid code');
        }

        if (!!req.body.description && !validateStringRange(req.body.description, 1, 1000)) {
            return handleValidationError(res, 'Invalid description');
        }

        getLastCodeId((lastId) => {
            const id = lastId + 1;

            const payload = {
                "category": req.body.category,
                "id": id,
                "created": admin.firestore.Timestamp.fromDate(new Date()),
                "description": req.body.description,
                "code": req.body.code,
                "active": false
            };

            shitcodes.doc(id.toString()).set(payload, {merge: true});

            res.json({ id });
        });
    });
};

const getLastCodeId = (callback) => {
    shitcodes.orderBy('id', 'desc').limit(1)
        .get().then(querySnapshot => {
        let doc = querySnapshot.docs[0].data();
        callback(doc.id);
    });
};

const testFirebase = (req, res) => {
    getLastCodeId((id) => {
        res.send("Last: " +id);
    })
};

exports.setupRoutes = app => {
    app.get('/sitemap.xml', generateSitemap);
    app.post('/api/code', handlePostCode);
    app.get('/api/firebase', testFirebase);
};