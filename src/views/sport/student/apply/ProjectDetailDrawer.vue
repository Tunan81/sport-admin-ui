<template>
  <a-drawer v-model:visible="visible" title="比赛项目 详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="项目编号">{{ dataDetail?.number }}</a-descriptions-item>
      <a-descriptions-item label="项目名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="规则介绍">{{ dataDetail?.introduction }}</a-descriptions-item>
      <a-descriptions-item label="比赛类型 ">{{ dataDetail?.type }}</a-descriptions-item>
      <a-descriptions-item label="男子/女子赛 ">{{ dataDetail?.gtype }}</a-descriptions-item>
      <a-descriptions-item label="招收人数/队数">{{ dataDetail?.upnum }}</a-descriptions-item>
      <a-descriptions-item label="裁判员数量">{{ dataDetail?.renum }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { type ProjectDetailResp, getProject } from '@/apis'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<ProjectDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getProject(dataId.value)
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
