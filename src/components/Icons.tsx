import React from 'react'
import type { PropsWithChildren } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({name}: IconsProps) => {

    return <Icon name={name} size={38} color="#FFFFFF" />

}


export default Icons