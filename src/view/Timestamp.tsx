import { h, FunctionComponent } from 'preact';
import { css } from 'linaria';

export interface TimestampProps {
    created?: Date;
    lastModified?: Date;
}
const Timestamp: FunctionComponent<TimestampProps> = ({
    created,
    lastModified,
}) => {
    return <div
        id="timestamp"
        class={css`
            color: #888;
            font-size: 10pt;
            text-align: left;
        `}>
        { created && <DateView date={created} text="작성일" timeClass="created"/> }
        { lastModified && <DateView date={lastModified} text="마지막 수정일" timeClass="last-modified"/> }
    </div>;
};
export default Timestamp;

interface DateViewProps {
    date: Date;
    text: string;
    timeClass?: string;
}
const DateView: FunctionComponent<DateViewProps> = ({ date, text, timeClass }) => {
    const className = css`margin: 0;`;
    return (
        !isNaN(date.getTime()) ?
        <p class={className}>
            { text }: <time dateTime={ date.toISOString() } class={timeClass}/>
            { date.toLocaleString() }
        </p> :
        <p class={className}>잘못된 { text }</p>
    );
};
