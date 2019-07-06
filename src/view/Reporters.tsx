import { h, FunctionComponent } from 'preact';
import { css, cx } from 'linaria';

export interface ReportersProps {
    reporters: ReporterProps[];
}
const Reporters: FunctionComponent<ReportersProps> = ({
    reporters,
}) => {
    return <ul
        id="reporters"
        class={css`
            list-style-type: none;
            text-align: right;
        `}>
        { reporters.map((reporter, index) => <Reporter
            key={index}
            name={reporter.name}
            mail={reporter.mail}
        />) }
    </ul>;
};
export default Reporters;

export interface ReporterProps {
    name?: string;
    mail?: string;
}
const Reporter: FunctionComponent<ReporterProps> = ({ name, mail }) => {
    return <li>
        <span class="name">{ name }</span>
        <span class={cx(css`
            margin-left: 8px;
        `, 'mail')}>{ mail }</span>
    </li>;
};
