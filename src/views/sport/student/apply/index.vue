<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      title="比赛报名"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
      @refresh="search"
    >
      <template #custom-left>
	        <a-input v-model="queryForm.number" placeholder="请输入项目编号" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
	        <a-input v-model="queryForm.name" placeholder="请输入项目名称" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
	        <a-input v-model="queryForm.type" placeholder="请输入比赛类型 " allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
	        <a-input v-model="queryForm.upnum" placeholder="请输入招收人数/队数" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
        <a-button @click="reset">重置</a-button>
      </template>
      <template #type="{ record }">
        <a-tag v-if="record.type === '0'" color="green">个人</a-tag>
        <a-tag v-else color="red">团队</a-tag>
      </template>
      <template #gtype="{ record }">
        <a-tag v-if="record.gtype === '0'" color="green">女子</a-tag>
        <a-tag v-else color="red">男子</a-tag>
      </template>
      <template #name="{ record }">
        <a-link @click="onDetail(record)">{{ record.name }}</a-link>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-if="record.type === '0'" @click="apply(record)">报名</a-link>
          <a-link v-if="record.type != '0'" @click="apply(record)">加入团队</a-link>
          <a-link v-if="record.type != '0'" @click="apply(record)">创建团队</a-link>
        </a-space>
      </template>
    </GiTable>
    <ProjectDetailDrawer ref="ProjectDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import ProjectDetailDrawer from './ProjectDetailDrawer.vue'
import { type ProjectResp, type ProjectQuery, deleteProject, exportProject, listProject, applyProject} from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import { useDict } from '@/hooks/app'
import {Message} from "@arco-design/web-vue";

defineOptions({ name: 'Project' })

const queryForm = reactive<ProjectQuery>({
  number: undefined,
  name: undefined,
  type: undefined,
  upnum: undefined,
  sort: ['createTime,desc']
})


const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listProject({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
  { title: '项目编号', dataIndex: 'number', slotName: 'number' },
  { title: '项目名称', dataIndex: 'name', slotName: 'name' },
  { title: '比赛类型 ', dataIndex: 'type', slotName: 'type' },
  { title: '男子/女子赛 ', dataIndex: 'gtype', slotName: 'gtype' },
  { title: '招收人数/队数', dataIndex: 'upnum', slotName: 'upnum' },
  {
    title: '操作',
    slotName: 'action',
    width: 260,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['sport:apply:update', 'sport:apply:delete'])
  }
]

// 重置
const reset = () => {
  queryForm.number = undefined
  queryForm.name = undefined
  queryForm.type = undefined
  queryForm.upnum = undefined
  search()
}

// 删除
const onDelete = (item: ProjectResp) => {
  return handleDelete(() => deleteProject(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 报名
const apply = async (record: any) => {
  console.log(record.id + record.gtype)
  const res = await applyProject(record.id, record.gtype)
  console.log(res)
  Message.success(res.msg)
}

const ProjectDetailDrawerRef = ref<InstanceType<typeof ProjectDetailDrawer>>()
// 详情
const onDetail = (item: ProjectResp) => {
  ProjectDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
