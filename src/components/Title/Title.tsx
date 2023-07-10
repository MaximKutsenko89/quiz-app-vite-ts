import './title.scss'
import { ReactNode } from 'react'
interface TitleProps {
    children: ReactNode
}
export const Title: React.FC<TitleProps> = ({ children }: TitleProps) =>
    <h1 className="title">{children}</h1>
