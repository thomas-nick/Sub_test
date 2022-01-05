import { FC, useState } from 'react'
import styles from './Address.module.sass'
import { AddressProps, AddressSize } from 'src/models/common/address-props'
import Snackbar from '../snackbar/Snackbar'
import { toShortAddress } from '../../utils/address'
import { copyText } from 'src/utils'
import { Grow, IconButton } from '@mui/material'
import Image from '../image/Image'
import ButtonIcon from '../button/button-icon/ButtonIcon'
import Text from '../text/Text'
import { TextSizes } from 'src/models/common/typography'
import { useModal } from 'src/hooks/useModal'
import ModalQr from '../../modal/modal-qr/ModalQr'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'

const Address: FC<AddressProps> = ({
    isQr,
    isIcon,
    label,
    textProps,
    className: inputClassName,
    lengthOfAddress,
    size,
    isCopy = true
}) => {
    const {isMobile} = useResponsiveSize()
    const [ isCopied, setIsCopied ] = useState(false)
    const { toggleModal, isVisible } = useModal()
    const className = inputClassName ? `${styles.address} ${inputClassName}` : styles.address
    const shortedAddress = toShortAddress(label, lengthOfAddress)
    const sizes: Record<AddressSize, any> = {
        sm: {type: TextSizes.SECONDARY, size: 16},
        lg: {type: TextSizes.NORMAL, size: 24}
    }

    return (
        <div className={className}>
            {isIcon &&
            <Image
                src={'/wallet.svg'}
                width={sizes[size].size}
                height={sizes[size].size}
                alt={'wallet'}
            />
            }
            <Text type={sizes[size].type} paragraph {...textProps}>{shortedAddress}</Text>
            {(isCopy || isMobile) &&
            <>
                <Grow in={true} style={{transformOrigin: '0 0 0'}}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation()
                            copyText(label)
                            setIsCopied(true)
                        }}
                    >
                        <Image
                            src={'/copy.svg'}
                            width={sizes[size].size}
                            height={sizes[size].size}
                            alt="copy"
                        />
                    </IconButton>
                </Grow>
                <Snackbar
                    open={isCopied}
                    onClose={() => setIsCopied(false)}
                    message={'Address copied!'}
                />
            </>

            }
            {isQr &&
            <>
                <ModalQr id={label} open={isVisible} onClose={toggleModal}/>
                <ButtonIcon className={styles.qr} onClick={toggleModal}>
                    <Image src={'/qr.svg'} width={sizes[size].size} height={sizes[size].size} alt={'qr'} />
                </ButtonIcon>
            </>
            }
        </div>
    )
}

export default Address
