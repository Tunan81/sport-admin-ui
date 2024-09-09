<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      title="参赛名单管理"
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
	        <a-input v-model="queryForm.projectId" placeholder="请输入项目名称" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
	        <a-input v-model="queryForm.userId" placeholder="请输入裁判员姓名" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
	        <a-input v-model="queryForm.typeId" placeholder="请输入运动员姓名/ 团体名称" allow-clear @change="search">
	          <template #prefix><icon-search /></template>
	        </a-input>
        <a-select
            v-model="queryForm.isCancel"
            placeholder="请选择个人/团队比赛"
            allow-clear
            style="width: 200px"
            @change="search"
        >
          <a-option :value="0">未取消</a-option>
          <a-option :value="1">已取消</a-option>
        </a-select>
        <a-button @click="reset">重置</a-button>
      </template>
      <template #isCancel="{ record }">
        <a-tag v-if="record.gtype === '0'" color="green">未取消</a-tag>
        <a-tag v-else color="red">已取消</a-tag>
      </template>
      <template #name="{ record }">
        <a-link @click="onDetail(record)">{{ record.name }}</a-link>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['sport:arrangement:update']" @click="onUpdate(record)">修改</a-link>
          <a-link
            v-permission="['sport:arrangement:delete']"
            status="danger"
            :disabled="record.disabled"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <ArrangementAddModal ref="ArrangementAddModalRef" @save-success="search" />
    <ArrangementDetailDrawer ref="ArrangementDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import ArrangementAddModal from './ArrangementAddModal.vue'
import ArrangementDetailDrawer from './ArrangementDetailDrawer.vue'
import { type ArrangementResp, type ArrangementQuery, deleteArrangement, exportArrangement, listArrangement } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import { useDict } from '@/hooks/app'

defineOptions({ name: 'Arrangement' })

const route = useRoute();
const projectId = route.query.id; // 获取传递的 id
console.log("arrangement:" + projectId);

const queryForm = reactive<ArrangementQuery>({
  projectId: projectId || undefined,
  userId: undefined,
  typeId: undefined,
  isCancel: undefined,
  sort: ['createTime,desc']
})


const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listArrangement({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
  { title: '项目名称', dataIndex: 'projectId', slotName: 'projectId' },
  { title: '运动员名称/团体名称', dataIndex: 'typeId', slotName: 'typeId' },
  { title: '是否取消', dataIndex: 'isCancel', slotName: 'isCancel' },
  { title: '取消原因', dataIndex: 'reason', slotName: 'reason' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['sport:arrangement:update', 'sport:arrangement:delete'])
  }
]

// 重置
const reset = () => {
  queryForm.projectId = undefined
  queryForm.userId = undefined
  queryForm.typeId = undefined
  queryForm.isCancel = undefined
  search()
}

// 删除
const onDelete = (item: ArrangementResp) => {
  return handleDelete(() => deleteArrangement(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportArrangement(queryForm))
}

const ArrangementAddModalRef = ref<InstanceType<typeof ArrangementAddModal>>()
// 新增
const onAdd = () => {
  ArrangementAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: ArrangementResp) => {
  ArrangementAddModalRef.value?.onUpdate(item.id)
}

const ArrangementDetailDrawerRef = ref<InstanceType<typeof ArrangementDetailDrawer>>()
// 详情
const onDetail = (item: ArrangementResp) => {
  ArrangementDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
