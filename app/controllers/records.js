import {Project, Record} from '../models';
import BaseController from './base';
import {params} from '../lib/utils';

class RecordController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.setRecord, ["show"]);
  };

  async index(ctx) {
    const projectId = ctx.params.projectId;
    const project = await Project.findById(projectId).exec();
    const records = await Record
                      .find({project: projectId})
                      .populate('project api')
                      .sort({created_at: 'desc'})
                      .exec();
    let successCount = 0;
    let failedCount = 0;
    records.forEach((record, index) => {
      if (record.status_code.match(/[123].+?/g)) {
        successCount += 1;
      } else {
        failedCount += 1
      }
    });
    await ctx.render('record/index.njk', {project, records, successCount, failedCount});
  };

  async show(ctx) {
    const projectId = ctx.params.projectId;
    const record = ctx._data.record;
    await ctx.render('record/show.njk', {projectId, record});
  };

  async setRecord(ctx) {
    const recordId = ctx.params.recordId;
    const record = await Record
                      .findById(recordId)
                      .populate('project api')
                      .exec();
    ctx._data.record = record;
  };
}

export default new RecordController();
