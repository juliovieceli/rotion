import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IDocument } from '~/src/shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading: isCreateNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        console.log('clicou')
        const response = await window.api.createDocument()

        return response.data
      },
      {
        onSuccess: (data) => {
          // esse metodo força o reactquery a executar a query sinalizada do zero
          // queryClient.invalidateQueries(['documents'])
          queryClient.setQueriesData<IDocument[]>(
            ['documents'],
            (documents) => {
              if (documents && documents?.length >= 0) {
                return [...documents, data]
              } else {
                return [data]
              }
            },
          )
          navigate(`/documents/${data.id}`)
        },
      },
    )

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }
    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      onClick={() => createDocument()}
      disabled={isCreateNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute text-gray-200 bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo Documento
    </button>
  )
}
