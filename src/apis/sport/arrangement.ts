import http from '@/utils/http'

const BASE_URL = '/sport/arrangement'

export interface ArrangementResp {
  id: string
  projectId: string
  userId: string
  typeId: string
  isCancel: string
  reason: string
  createUserString: string
  updateUserString: string
}
export interface ArrangementDetailResp {
  id: string
  projectId: string
  userId: string
  typeId: string
  isCancel: string
  reason: string
  createTime: string
  updateTime: string
  createUser: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface ArrangementQuery {
  projectId: string
  userId: string
  typeId: string
  isCancel: string
  sort: Array<string>
}
export interface ArrangementPageQuery extends ArrangementQuery, PageQuery {}

/** @desc 查询项目安排 列表 */
export function listArrangement(query: ArrangementPageQuery) {
  return http.get<PageRes<ArrangementResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询项目安排 详情 */
export function getArrangement(id: string) {
  return http.get<ArrangementDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增项目安排  */
export function addArrangement(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改项目安排  */
export function updateArrangement(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除项目安排  */
export function deleteArrangement(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出项目安排  */
export function exportArrangement(query: ArrangementQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
