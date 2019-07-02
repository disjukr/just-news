import { h, FunctionComponent, Fragment } from 'preact';

import Timestamp, { TimestampProps } from './Timestamp';
import Reporters, { ReporterProps } from './Reporters';

interface ArticleProps {
    optOutUrl?: string;
    title?: string;
    subtitle?: string;
    timestamp?: TimestampProps;
    reporters?: ReporterProps[];
    content?: string;
}
const Article: FunctionComponent<ArticleProps> = ({
    optOutUrl,
    title,
    subtitle,
    timestamp,
    reporters,
    content,
}) => {
    return <Fragment>
        <div id="info">
            <small>
                <a href="https://github.com/disjukr/just-news">just-news</a>에 의해 변환된 페이지입니다.
                {optOutUrl && <a href={optOutUrl}>원본 페이지 보기</a>}
            </small>
        </div>
        <h1 id="title">{ title || 'no title' }</h1>
        { subtitle && <h2 id="sub-title" dangerouslySetInnerHTML={{ __html: subtitle }}/> }
        { timestamp && <Timestamp
            created={timestamp.created}
            lastModified={timestamp.lastModified}
        /> }
        <div id="meta">
            { reporters && <Reporters reporters={reporters}/>}
        </div><br/>
        { content ?
            <div id="content" dangerouslySetInnerHTML={{ __html: content }}/> :
            <div id="content">empty</div> }
    </Fragment>;
};
export default Article;
