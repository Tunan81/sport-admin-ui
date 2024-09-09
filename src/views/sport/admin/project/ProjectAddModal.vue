<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '520px' }"
    width="90%"
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getProject, addProject, updateProject } from '@/apis'
import { type Columns, GiForm, type Options } from '@/components/GiForm'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改比赛项目 ' : '新增比赛项目 '))
const formRef = ref<InstanceType<typeof GiForm>>()


const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '项目编号',
    field: 'number',
    type: 'input',
    rules: [{ required: true, message: '请输入项目编号' }]
  },
  {
    label: '项目名称',
    field: 'name',
    type: 'input',
    rules: [{ required: true, message: '请输入项目名称' }]
  },
  {
    label: '规则介绍',
    field: 'introduction',
    type: 'input',
    rules: [{ required: true, message: '请输入规则介绍' }]
  },
  {
    label: '比赛类型 ',
    field: 'type',
    type: 'input',
    rules: [{ required: true, message: '请输入比赛类型 ' }]
  },
  {
    label: '招收人数 / 队数',
    field: 'upnum',
    type: 'input',
    rules: [{ required: true, message: '请输入招收人数 / 队数' }]
  },
  {
    label: '裁判员数量',
    field: 'renum',
    type: 'input',
    rules: [{ required: true, message: '请输入裁判员数量' }]
  },
]

const { form, resetForm } = useForm({
    // todo 待补充
})

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getProject(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateProject(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addProject(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onAdd, onUpdate })
</script>
