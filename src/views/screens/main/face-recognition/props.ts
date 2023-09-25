import type { IProps as IViewProps } from './views/props';

export type IProps = IViewProps & {
    onChangeFaceLoading: (isLoading: boolean) => void;
}
