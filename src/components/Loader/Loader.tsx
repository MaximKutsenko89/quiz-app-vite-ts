import './loader.scss'
interface LoaderProps {
  text?: string,
  textRequired?: boolean
}
export const Loader: React.FC<LoaderProps> = ({ text, textRequired }: LoaderProps) => (

  <div className='loader-wrapper'>
    <div className="lds-facebook"><div></div><div></div><div></div></div>
    {textRequired && text}
  </div>

)

