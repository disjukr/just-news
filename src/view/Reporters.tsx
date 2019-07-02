import { h, FunctionComponent } from 'preact';

export interface ReportersProps {
    reporters: ReporterProps[];
}
const Reporters: FunctionComponent<ReportersProps> = ({
    reporters,
}) => {
    return <ul id="reporters">
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
        <span class="mail">{ mail }</span>
    </li>;
};
