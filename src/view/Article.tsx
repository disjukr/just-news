import { h, FunctionComponent, Fragment } from 'preact';
import { css } from 'linaria';

import Timestamp, { TimestampProps } from './Timestamp';
import Reporters, { ReporterProps } from './Reporters';
import Settings from './Settings';

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
        <div id="info" class={css`
            margin-bottom: 20px;
            color: #666;
        `}>
            <small>
                <a href="https://github.com/disjukr/just-news">just-news</a>에 의해 변환된 페이지입니다.
                {optOutUrl && <a href={optOutUrl}>원본 페이지 보기</a>}
            </small>
        </div>
        <h1
            id="title"
            class={css`
                margin-top: 20px;
                margin-bottom: 40px;
            `}>
            { title || 'no title' }
        </h1>
        { subtitle && <h2
            id="sub-title"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            class={css`
                margin-top: -20px;
                margin-bottom: 40px;
            `}
        /> }
        <div
            id="meta"
            class={css`
                display: inline-block;
                width: 640px;
                max-width: calc(100% - 40px);
            `}>
            { timestamp && <Timestamp
                created={timestamp.created}
                lastModified={timestamp.lastModified}
            /> }
            { reporters && <Reporters reporters={reporters}/>}
        </div><br/>
        <Content content={content}/>
        <Settings />
    </Fragment>;
};
export default Article;

interface ContentProps {
    content?: string;
}
const Content: FunctionComponent<ContentProps> = ({ content }) => {
    const className = css`
        display: inline-block;
        width: 640px;
        max-width: calc(100% - 40px);
        font-size: 11pt;
        text-align: justify;
        line-height: 1.6;
        img {
            display: block;
            margin: 15px auto;
            max-width: 100%;
            height: auto;
        }
    `;
    return content ?
        <div id="content" class={className} dangerouslySetInnerHTML={{ __html: content }}/> :
        <div id="content" class={className}>empty</div>;
};
