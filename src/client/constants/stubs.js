import CATEGORIES from "./categories";

export const generateCodes = (count) => {

    let list = [];
    let categories = Object.keys(CATEGORIES);

    for (let i = 0; i < count; i++) {

        let category = categories[Math.floor(Math.random()*categories.length)];

        list.push(
            {
                id: Math.floor(Math.random() * 1000),
                category: category,
                description: 'Some very ugly code',
                code: `
                    import AppBar from '@material-ui/core/AppBar';
                    import Toolbar from '@material-ui/core/Toolbar';
                    import Typography from '@material-ui/core/Typography';
                    import Button from '@material-ui/core/Button';
                    import IconButton from '@material-ui/core/IconButton';                
                `,
                created: '2019-01-01 22:10:00'
            }
        );
    }

    return list;
};

const generateCodeResponse = (id) => (
    {
        id: id,
        category: 'java',
        description: 'Some very ugly code',
        code: `
                    import AppBar from '@material-ui/core/AppBar';
                    import Toolbar from '@material-ui/core/Toolbar';
                    import Typography from '@material-ui/core/Typography';
                    import Button from '@material-ui/core/Button';
                    import IconButton from '@material-ui/core/IconButton';                
                `,
        created: '2019-01-01 22:10:00',
    }
);

export const generateCode = (id) => (
    {
        exists: true,
        data: () => generateCodeResponse(id),
    }
);