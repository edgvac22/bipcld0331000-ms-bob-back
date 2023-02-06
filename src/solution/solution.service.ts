import { Injectable } from '@nestjs/common';
import { AddSolutionDto } from './dto/add-solution.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { S3 } from 'aws-sdk';

@Injectable()
export class SolutionService {
    s3 = new S3();
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
                    'SET #ve = :ve, #id = :id, #su = :su, #st = :st, #sd = :sd, #du = :du',
                ExpressionAttributeNames: {
                    "#ve": "verify",
                    "#id": "solutionId",
                    "#su": "solutionUser",
                    "#st": "solutionTitle",
                    "#sd": "solutionDetail",
                    "#du": "dateUpdated"
                },
                ExpressionAttributeValues: {
                    ":ve": solutionObject.verify,
                    ":id": solutionObject.solutionId,
                    ":su": solutionObject.solutionUser,
                    ":st": solutionObject.solutionTitle,
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
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
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
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
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
                    'SET #st = :st, #sd = :sd, #du = :du',
                ExpressionAttributeNames: {
                    "#st": "solutionTitle",
                    "#sd": "solutionDetail",
                    "#du": "dateUpdated"
                },
                ExpressionAttributeValues: {
                    ":st": solutionObject.solutionTitle,
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
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
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
                    'SET #ve = :ve, #dd = :dd REMOVE solutionId, solutionUser, solutionTitle, solutionDetail, dateUpdated',
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
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
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
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
            }
        }
    }

    async uploadSolutionFile(fileName: string, dataBuffer: Buffer, issueId: string) {
        try {
            const params = {
                Bucket: 'plantilla-s3-prueba-ingsw',
                Body: dataBuffer,
                Key: `solution/${issueId}/${uuid()}-${fileName}`,
                ACL: 'public-read'
            }
            return {
                msg: 'Uploaded successfully',
                data: await this.s3.upload(params).promise(),
            }
        } catch (err) {
            return {
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
            }
        }
    }

    async countSolutionBucket(issueId: string) {
        const params = {
            Bucket: 'plantilla-s3-prueba-ingsw',
            Prefix: `solution/${issueId}/`,
        }
        try {
            const countBucket = await this.s3.listObjects(params).promise();
            return {
                statusCode: 201,
                messageType: 'OK Request',
                message: 'Retrieved successfully.',
                length: countBucket.Contents.length - 1,
            }
        } catch (err) {
            return {
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
            }
        }
    }

    async imageSolutionBucket(issueId: string) {
        const params = {
            Bucket: 'plantilla-s3-prueba-ingsw',
            Prefix: `solution/${issueId}/`,
        }
        try {
            const data = await this.s3.listObjects(params).promise();
            const files = data.Contents;
            const fileUrls: any = [];
            for (const element of files) {
                const file = element;
                const fileKey = file.Key;

                const fileUrl = this.s3.getSignedUrl('getObject', {
                    Bucket: 'plantilla-s3-prueba-ingsw',
                    Key: fileKey,
                });
                fileUrls.push(fileUrl);
            }
            return {
                statusCode: 200,
                messageType: 'OK Request',
                message: 'Retrieved successfully',
                fileUrls: fileUrls,
            }
        } catch (err) {
            return {
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
            }
        }
    }
}