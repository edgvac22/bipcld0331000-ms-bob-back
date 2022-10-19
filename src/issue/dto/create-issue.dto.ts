export class CreateIssueDto {
    readonly issueUser: string;
    readonly area: string;
    readonly environment: string;
    readonly issueDetail: string;
    readonly issueAttachment: object;
    readonly dateCreate: string;
    readonly verify: string;
  }