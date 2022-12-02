import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { IDocument } from '~/src/shared/types/ipc'
import { Editor, IOnContentUpdatedParams } from '../components/editor'
import { ToC } from '../components/ToC'

export function Document() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })

    return response.data
  })

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: IOnContentUpdatedParams) => {
      await window.api.saveDocument({ id: id!, title, content })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueriesData<IDocument[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title }
            }
            return document
          })
        })
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
    return ''
  }, [data])

  const handleEditorContentUpdated = useCallback(
    ({ title, content }: IOnContentUpdatedParams) => {
      saveDocument({ title, content })
    },
    [saveDocument],
  )

  return (
    <main className="flex-1 flex py-12 px10 gap-8 text-rotion-400">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>
        <ToC.Root>
          <ToC.Link>Backend</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticacao</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  )
}
