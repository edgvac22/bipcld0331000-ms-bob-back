import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddSolutionDto } from './dto/add-solution.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionService {
    TABLE_NAME = 'bob';
    constructor(private dbService: DatabaseService) {}

    async addSolution(issueId: string, addSolutionDto: AddSolutionDto) {
        const solutionObject = {
            solutionId: uuid(),
            dateUpdated: Date(),
            verify: "yes",
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

    async listSolution() {
        try {
            return {
                message: 'Retrieved successfully',
                data: await this.dbService
                    .connect()
                    .query({
                        TableName: this.TABLE_NAME,
                        IndexName: "verify-index",
                        KeyConditionExpression: "verify = :v_solution",
                        ExpressionAttributeValues: {
                            ":v_solution": "yes"
                        },
                    })
                    .promise(),
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async updateSolution(issueId: string, updateSolutionDto: UpdateSolutionDto) {
        const solutionObject = {
            dateUpdated: Date(),
            ...updateSolutionDto,
        };
        try {
            await this.dbService
                .connect()
                .update({
                    TableName: this.TABLE_NAME,
                    Key: { issueId },
                    UpdateExpression:
                        'SET #st = :st, #sa = :sa, #sd = :sd, #du = :du',
                    ExpressionAttributeNames: {
                        "#st": "solutionTitle",
                        "#sa": "solutionAttachment",
                        "#sd": "solutionDetail",
                        "#du": "dateUpdated"
                    },
                    ExpressionAttributeValues: {
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
                message: `Solution updated successfully.`,
                detail: solutionObject,
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async removeSolution(issueId: string) {
        const solutionObject = {
            verify: "obs",
            dateDeleted: Date()
        };
        try {
            await this.dbService
                .connect()
                .update({
                    TableName: this.TABLE_NAME,
                    Key: { issueId },
                    UpdateExpression:
                        'SET #ve = :ve, #dd = :dd REMOVE solutionId, solutionUser, solutionTitle, solutionDetail, solutionAttachment, dateUpdated',
                    ExpressionAttributeNames: {
                        "#ve": "verify",
                        "#dd": "dateDeleted"
                    },
                    ExpressionAttributeValues: {
                        ":ve": solutionObject.verify,
                        ":dd": solutionObject.dateDeleted
                    },
                })
                .promise();
            return {
                statusCode: 201,
                messageType: `OK Request`,
                message: `Solution deleted successfully.`,
                detail: solutionObject,
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async detailIssue(solutionId: string) {
        try {
            return {
                message: 'Retrieved successfully',
                data: await this.dbService
                    .connect()
                    .query({
                        TableName: this.TABLE_NAME,
                        IndexName: "solutionId-index",
                        KeyConditionExpression: "solutionId = :v_solutionId",
                        ExpressionAttributeValues: {
                            ":v_solutionId": solutionId
                        },
                    })
                    .promise(),
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}