import {Project, Record} from '../models';
import BaseController from './base';
import {params} from '../lib/utils';
import consts from '../lib/consts';

class RecordController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.setRecord, ["show"]);
  };

  async index(ctx) {
    const status = ctx.request.query.status;
    const projectId = ctx.params.projectId;
    let query = {project: projectId};
    if (status === 'success') {
      query.status_code = new RegExp(/[123].+?/)
    } else if (status === 'failed'){
      query.status_code = new RegExp(/[45].+?/)
    }
    const totalPages = await Record.getTotalPage(query);
    let page = parseInt(ctx.query.page) || 1;
    if (page > totalPages && totalPages > 0) {
      page = totalPages;
    }
    const project = await Project.findById(projectId).exec();
    const records = await Record
                      .find(query)
                      .skip((page - 1) * consts.ITEMS_PER_PAGE)
                      .limit(consts.ITEMS_PER_PAGE)
                      .sort({created_at: 'desc'})
                      .exec();
    const totalRecords = await Record.count({project: projectId});
    const successRecordsCount = await Record.count({status_code: new RegExp(/[123].+?/)});
    const failedRecordsCount = totalRecords - successRecordsCount;
    const meta = {
      currentPage: page,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    };
    await ctx.render('record/index.njk', {meta, project, records, totalRecords, successRecordsCount, failedRecordsCount});
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
                      .exec();
    ctx._data.record = record;
  };
}

export default new RecordController();
