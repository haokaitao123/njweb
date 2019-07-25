//知识库
import  knowledgeSearch from '@/pages/knowledgeList/category'
//import useinfo from '@/pages/useinfo/useinfo'
import knowledgeChild from '@/pages/knowledgeList/orgframeManage'
import knowment from '@/pages/knowledgeList/knowment'
import classMent from '@/pages/knowledgeList/classment'
export default [
  {
    path: 'knowledgeSearch',
    name: 'knowledgeSearch',
    component: knowledgeSearch,
  },
	{
	  path: 'knowledgeChild',
	  name: 'knowledgeChild',
	  component: knowledgeChild,
	},
	{
		path: 'knowment',
		name: 'knowment',
		component: knowment,
	},
	{
		path: 'classMent',
		name: 'classMent',
		component: classMent,
	}
]