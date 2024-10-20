import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectApi"
import EditForm from "@/components/projects/EditForm"

const EditProjectView = () => {
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId)
  })

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404/' />

  if(data) return <EditForm data={data} projectId={projectId}/>
}

export default EditProjectView
