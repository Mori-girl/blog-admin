import React ,{Component,PropTypes} from 'react';
import timeParser from '../../utils/time_parser';
import './Article.scss';
class Article extends Component{
    static propTypes = {
		loading:PropTypes.bool,
		error:PropTypes.bool,
        aKey:PropTypes.number,
		push:PropTypes.func,
        loadArticle:PropTypes.func,
        aData:PropTypes.object
	};
     componentDidMount(){
		this.props.loadArticle(this.props.aKey);
	}
    htmlDecode(content){
        content=content&&content.replace(/\n/g,"<br />");
        let contentHTML=<article id="contentHtml" className="content" dangerouslySetInnerHTML={{__html:content}}></article>
        return contentHTML;
    }
    render(){
        const {loading,error,aData}=this.props;
        if(loading){
            return <p className="message">loading</p>
        }
        if(error){
            return <p className="message">Oops,can not find this article.</p>
        }
        const {title,tags,catalog,updatedAt,author,content}=aData;
        let tagsArr=[];
        if(tags!==''){
            tagsArr=tags.split('|');
        }
        const date=timeParser(updatedAt);
        const dContent=this.htmlDecode(content);
        return (
            <div>
                <h3>{title}</h3>
                <p>Post by <span>{author}</span> on <span>{date.year}.{date.month}.{date.day}</span></p>
                {
                    tagsArr.map((item,index)=>{
                        return <p key={index}>{item}</p>
                    })
                }
                <div className="detail" ref="detail">{dContent}</div>
            </div>
        );
    }
}
export default Article;