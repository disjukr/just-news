import { h, FunctionComponent } from 'preact';

export interface TimestampProps {
    created?: Date;
    lastModified?: Date;
}
const Timestamp: FunctionComponent<TimestampProps> = ({
    created,
    lastModified,
}) => {
    return <div id="timestamp">
        { created && <DateView date={created} text="작성일" class="created"/> }
        { lastModified && <DateView date={lastModified} text="마지막 수정일" class="last-modified"/> }
    </div>;
};
export default Timestamp;

interface DateViewProps {
    date: Date;
    text: string;
    class?: string;
}
const DateView: FunctionComponent<DateViewProps> = ({ date, text, class: className }) => {
    return (
        !isNaN(date.getTime()) ?
        <p>
            { text }: <time dateTime={ date.toISOString() } class={className}/>
            { date.toLocaleString() }
        </p> :
        <p>잘못된 { text }</p>
    );
};
