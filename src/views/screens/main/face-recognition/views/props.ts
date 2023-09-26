export interface IProps {
    image: string | null;
    width: number;
    height: number;
    onRetakeImage: () => void;
    onDetectFace: () => void;
    isFaceLoading: boolean;
    isMobile: boolean;
    onChangeFaceLoading: (isLoading: boolean) => void;
}
