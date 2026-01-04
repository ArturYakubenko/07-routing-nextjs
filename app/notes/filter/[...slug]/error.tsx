

"use client"


interface ErrorProps {
    error: Error;
    reset?: () => void; 
}

const ErrorMessage = ({ error }: ErrorProps) => {
    return (
        <div className="error-container">
            <p>Could not fetch the list of notes. {error.message}</p>
        </div>
    );
};

export default ErrorMessage;