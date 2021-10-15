
import axiosWithAuth from '../utils/axiosWithAuth';

const articleService = (setArticles)=> {
    axiosWithAuth()
        .get('http://localhost:5000/api/articles')
        .then(res => {
            setArticles(res.data);
        })
        .catch(err => {
            console.error(err);
        })
}

export default articleService;