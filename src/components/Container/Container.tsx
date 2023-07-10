import './container.scss'
import { ReactNode } from 'react'
interface ContainerProps {
    children: ReactNode
}
export const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) =>
    <div className='container'>{children}</div>


