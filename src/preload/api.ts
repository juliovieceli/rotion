import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IFetchAllDocumentsResponse,
  IFetchDocumentRequest,
  IFetchDocumentResponse,
  ISaveDocumentRequest,
} from '@/shared/types/ipc'
import { ipc } from '@/shared/constants/ipc'
import { ipcRenderer } from 'electron'

export const api = {
  fetchDocuments(): Promise<IFetchAllDocumentsResponse> {
    return ipcRenderer.invoke(ipc.documents.fetchAll)
  },

  fetchDocument(
    request: IFetchDocumentRequest,
  ): Promise<IFetchDocumentResponse> {
    return ipcRenderer.invoke(ipc.documents.fetch, request)
  },

  createDocument(): Promise<ICreateDocumentResponse> {
    return ipcRenderer.invoke(ipc.documents.create)
  },

  saveDocument(request: ISaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(ipc.documents.save, request)
  },

  deleteDocument(request: IDeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(ipc.documents.delete, request)
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback)

    return () => {
      ipcRenderer.off('new-document', callback)
    }
  },
}
