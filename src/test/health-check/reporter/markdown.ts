import { Reporter } from '.';

const markdownReporter: Reporter<string> = jobResults => {
    let report = '| 사이트 | 상태 |\n|------|-------|';
    for (const jobResult of jobResults) {
        let message;
        if (jobResult.type == 'error') {
            message = '• ❓테스트 실패';
        } else {
            message = '• '
            if (jobResult.problems && jobResult.problems.length == 0) {
                message += `✅`;
            } else {
                message += `❌`;
            }
            const links = [`[url](${jobResult.url})`];
            for(const issueNumber of jobResult.related) {
                links.push(`[${issueNumber}](https://github.com/disjukr/just-news/issues/${issueNumber})`);
            }
            message += '(' + links.join(', ') + ')';

            const problemMessages = [];
            for (const [problem, reason] of jobResult.problems) {
                switch (reason) {
                    case 'missing':
                        problemMessages.push(`\`잘못된 ${sayProblem(problem)}\``);
                        break;
                    case 'invalid':
                        problemMessages.push(`\`${sayProblem(problem)} 누락됨\``);
                        break;
                }
            }
            message += problemMessages.join(', ');

        }
        report += `\n| ${jobResult.impl} | ${message} |`;
    }
    return report;
};

export default markdownReporter;

const sayProblem = (text: string) => {
    switch (text) {
        case 'title': return '제목';
        case 'subtitle': return '부제목';
        case 'content': return '본문';
        case 'timestamp.created': return '작성일';
        case 'timestamp.lastModified': return '수정일';
        case 'reporters.0.name': return '작성자 이름';
        case 'reporters.0.mail': return '작성자 이메일';
    }
    return text;
};
