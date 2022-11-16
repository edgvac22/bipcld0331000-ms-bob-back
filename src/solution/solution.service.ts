import { Injectable } from '@nestjs/common';
import { AddSolutionDto } from './dto/add-solution.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionService {
    constructor(private dbService: DatabaseService) { }

    async addSolution(issueId: string, addSolutionDto: AddSolutionDto) {
        const solutionObject = {
            solutionId: uuid(),
            dateUpdated: Date(),
            verify: "yes",
            ...addSolutionDto,
        };
        try {
            const params = {
                TableName: process.env.BOB_TABLE,
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
            };
            return {
                statusCode: 201,
                messageType: `OK Request`,
                message: `Solution created successfully.`,
                data: await this.dbService.documentClient.update(params).promise(),
            };
        } catch (err) {
            return {
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW04",
                errorMessage: "ERROR solution",
                detail: "ERROR addSolution function"
            }
        }
    }

    async listSolution() {
        try {
            const params = {
                TableName: process.env.BOB_TABLE,
                IndexName: "verify-index",
                KeyConditionExpression: "verify = :v_solution",
                ExpressionAttributeValues: {
                    ":v_solution": "yes"
                },
            };
            return {
                message: 'Retrieved successfully',
                data: await this.dbService.documentClient.query(params).promise(),
            };
        } catch (err) {
            return {
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW05",
                errorMessage: "ERROR solution",
                detail: "ERROR listSolution function"
            }
        }
    }

    async updateSolution(issueId: string, updateSolutionDto: UpdateSolutionDto) {
        const solutionObject = {
            dateUpdated: Date(),
            ...updateSolutionDto,
        };
        try {
            const params = {
                TableName: process.env.BOB_TABLE,
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
            };
            return {
                statusCode: 201,
                messageType: `OK Request`,
                message: `Solution updated successfully.`,
                data: await this.dbService.documentClient.update(params).promise(),
            };
        } catch (err) {
            return {
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW06",
                errorMessage: "ERROR solution",
                detail: "ERROR updateSolution function"
            }
        }
    }

    async removeSolution(issueId: string) {
        const solutionObject = {
            verify: "obs",
            dateDeleted: Date()
        };
        try {
            const params = {
                TableName: process.env.BOB_TABLE,
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
            };
            return {
                statusCode: 201,
                messageType: `OK Request`,
                message: `Solution deleted successfully.`,
                data: await this.dbService.documentClient.update(params).promise(),
            };
        } catch (err) {
            return {
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW07",
                errorMessage: "ERROR solution",
                detail: "ERROR removeSolution function"
            }
        }
    }

    async detailSolution(solutionId: string) {
        try {
            const params = {
                TableName: process.env.BOB_TABLE,
                IndexName: 'solutionId-index',
                KeyConditionExpression: 'solutionId = :v_solutionId',
                ExpressionAttributeValues: {
                    ':v_solutionId': solutionId
                },
            };
            return {
                message: 'Retrieved successfully',
                data: await this.dbService.documentClient.query(params).promise(),
            };
        } catch (err) {
            return {
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW08",
                errorMessage: "ERROR solution",
                detail: "ERROR detailSolution function"
            }
        }
    }
}