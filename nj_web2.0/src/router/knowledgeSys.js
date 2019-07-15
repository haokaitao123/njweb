//知识库
import  knowledgeSearch from '@/pages/knowledgeList/orgframeManage'
//import useinfo from '@/pages/useinfo/useinfo'
import knowledgeChild from '@/pages/knowledgeList/orgframeManage'

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
	}
]