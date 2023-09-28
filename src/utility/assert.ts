type EvaluationFunction = () => boolean;

/**
 * When in development mode, will evaluate a function and throw an error if it returns false.
 * Does nothing in production mode.
 * @param evalFunc Function to be evaluated. Must take no parameters and return a boolean.
 * @param message (Optional) Message to show if assertion fails.
 * @returns
 */
export default function assert(evalFunc: EvaluationFunction, message: string = "Assertion falied!"): void {
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') return;
    if (evalFunc()) return;
    throw new Error(message);
}