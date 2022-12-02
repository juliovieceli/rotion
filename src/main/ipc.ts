import { ipcMain } from 'electron'
import { ipc } from '../shared/constants/ipc'
import { randomUUID } from 'node:crypto'

import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IDocument,
  IFetchAllDocumentsResponse,
  IFetchDocumentRequest,
  IFetchDocumentResponse,
  ISaveDocumentRequest,
} from '../shared/types/ipc'
import { store } from './store'

ipcMain.handle(
  ipc.documents.fetch,
  async (_, { id }: IFetchDocumentRequest): Promise<IFetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as IDocument
    return {
      data: document,
    }
  },
)

ipcMain.handle(
  ipc.documents.fetchAll,
  async (): Promise<IFetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  ipc.documents.create,
  async (): Promise<ICreateDocumentResponse> => {
    const id = randomUUID()

    const newDocument: IDocument = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, newDocument)

    return { data: newDocument }
  },
)
ipcMain.handle(
  ipc.documents.save,
  async (_, data: ISaveDocumentRequest): Promise<void> => {
    store.set(`documents.${data.id}`, data)
  },
)

ipcMain.handle(
  ipc.documents.delete,
  async (_, { id }: IDeleteDocumentRequest): Promise<void> => {
    // @ts-ignore
    store.delete(`documents.${id}`)
  },
)
