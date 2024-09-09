import http from '@/utils/http'

const BASE_URL = '/sport/project'

export interface ProjectResp {
  id: string
  number: string
  name: string
  introduction: string
  type: string
  gtype: string
  upnum: string
  renum: string
  createTime: string
  updateTime: string
  createUser: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface ProjectDetailResp {
  id: string
  number: string
  name: string
  introduction: string
  type: string
  gtype: string
  upnum: string
  renum: string
  isCancel: string
  createTime: string
  updateTime: string
  createUser: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface ProjectQuery {
  number: string
  name: string
  type: string
  upnum: string
  sort: Array<string>
}
export interface ProjectPageQuery extends ProjectQuery, PageQuery {}

/** @desc 查询比赛项目 列表 */
export function listProject(query: ProjectPageQuery) {
  return http.get<PageRes<ProjectResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询比赛项目 详情 */
export function getProject(id: string) {
  return http.get<ProjectDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增比赛项目  */
export function addProject(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改比赛项目  */
export function updateProject(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除比赛项目  */
export function deleteProject(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出比赛项目  */
export function exportProject(query: ProjectQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
