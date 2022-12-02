export interface IDocument {
  id: string
  title: string
  content?: string
}

export interface ISaveDocumentRequest extends IDocument {}

export interface IFetchDocumentRequest {
  id: string
}

export interface IDeleteDocumentRequest {
  id: string
}

export interface IFetchAllDocumentsResponse {
  data: IDocument[]
}

export interface IFetchDocumentResponse {
  data: IDocument
}

export interface ICreateDocumentResponse {
  data: IDocument
}
