import { Children } from "./children.type"

type Provider = React.FC<Children>

export type Providers = {
  children: React.ReactNode
  providers: Provider[]
}
