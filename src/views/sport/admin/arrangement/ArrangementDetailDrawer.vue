<template>
  <a-drawer v-model:visible="visible" title="项目安排 详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="安排id 安排表的主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="项目id">{{ dataDetail?.projectId }}</a-descriptions-item>
      <a-descriptions-item label="裁判员id">{{ dataDetail?.userId }}</a-descriptions-item>
      <a-descriptions-item label="运动员id / 团体id">{{ dataDetail?.typeId }}</a-descriptions-item>
      <a-descriptions-item label="是否取消 0：取消，1：未取消">{{ dataDetail?.isCancel }}</a-descriptions-item>
      <a-descriptions-item label="取消原因 若未取消则为NULL">{{ dataDetail?.reason }}</a-descriptions-item>
      <a-descriptions-item label="录入时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新人">{{ dataDetail?.updateUser }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { type ArrangementDetailResp, getArrangement } from '@/apis'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<ArrangementDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getArrangement(dataId.value)
  dataDetail.value = res.data
}

// 打开详情
const onDetail = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onDetail })
</script>

<style lang="scss" scoped></style>
