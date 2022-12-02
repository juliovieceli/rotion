import Store from 'electron-store'
import { IDocument } from '@/shared/types/ipc'

interface IStoreType {
  documents: Record<string, IDocument>
}

export const store = new Store<IStoreType>({
  defaults: {
    documents: {},
  },
})
console.log(store.path)
