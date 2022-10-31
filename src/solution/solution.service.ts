import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddSolutionDto } from './dto/add-solution.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';

@Injectable()
export class SolutionService {
    TABLE_NAME = 'bob';
    constructor(private dbService: DatabaseService) {}

    async addSolution(issueId: string, addSolutionDto: AddSolutionDto) {
        const solutionObject = {
            solutionId: uuid(),
            dateUpdated: Date(),
            ...addSolutionDto,
        };
        try {
            await this.dbService
                .connect()
                .update({
                    TableName: this.TABLE_NAME,
                    Key: { issueId },
                    UpdateExpression:
                        'SET #ve = :ve, #id = :id, #su = :su, #st = :st, #sa = :sa, #sd = :sd, #du = :du',
                    ExpressionAttributeNames: {
                        "#ve": "verify",
                        "#id": "solutionId",
                        "#su": "solutionUser",
                        "#st": "solutionTitle",
                        "#sa": "solutionAttachment",
                        "#sd": "solutionDetail",
                        "#du": "dateUpdated"
                    },
                    ExpressionAttributeValues: {
                        ":ve": solutionObject.verify,
                        ":id": solutionObject.solutionId,
                        ":su": solutionObject.solutionUser,
                        ":st": solutionObject.solutionTitle,
                        ":sa": solutionObject.solutionAttachment,
                        ":sd": solutionObject.solutionDetail,
                        ":du": solutionObject.dateUpdated
                    },
                })
                .promise();
            return {
                statusCode: 201,
                messageType: `OK Request`,
                message: `Solution created successfully.`,
                detail: solutionObject,
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}