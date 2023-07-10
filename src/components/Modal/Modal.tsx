import { Button } from '../Button/Button'
import './modal.scss'

interface ModalProps {
    text: string,
    onConfirm: () => void,
    onCancel?: () => void,
    buttonRequired?: boolean,
}
export const Modal: React.FC<ModalProps> = ({
    text,
    onConfirm,
    onCancel,
    buttonRequired
}: ModalProps) => (
    <div className='overlay'>
        <div className="modal-inner">
            <h3 className='modal-title'>{text}</h3>
            <div className="modal-wrap">
                <Button
                    className={'btn btn--center btn--modal'}
                    onClick={onConfirm}
                >
                    Ok
                </Button>
                {buttonRequired &&
                    <Button
                        className={'btn btn--center btn--modal'}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>}
            </div>
        </div>
    </div>
)

