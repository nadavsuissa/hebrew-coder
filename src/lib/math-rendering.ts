/**
 * Dynamic Math Rendering System
 * Converts plain text math expressions into properly formatted mathematical notation
 */

export interface MathExpression {
  type: 'fraction' | 'equation' | 'expression';
  content: string;
  display: string;
}

/**
 * Renders a fraction in proper mathematical notation
 */
export function renderFraction(numerator: number | string, denominator: number | string): string {
  return `<span class="math-fraction"><span class="fraction-numerator">${numerator}</span><span class="fraction-denominator">${denominator}</span></span>`;
}

/**
 * Renders a mixed number (whole number + fraction)
 */
export function renderMixedNumber(whole: number, numerator: number, denominator: number): string {
  return `${whole} ${renderFraction(numerator, denominator)}`;
}

/**
 * Renders a mathematical equation with proper formatting
 */
export function renderEquation(left: string, operator: string, right: string, equals?: string): string {
  const eq = equals ? ` = ${equals}` : '';
  return `<span class="math-equation">${left} ${operator} ${right}${eq}</span>`;
}

/**
 * Renders multiplication with × symbol
 */
export function renderMultiplication(a: string, b: string, result?: string): string {
  const res = result ? ` = ${result}` : '';
  return `<span class="math-multiplication">${a} × ${b}${res}</span>`;
}

/**
 * Renders division with ÷ symbol or fraction bar
 */
export function renderDivision(dividend: string, divisor: string, asFraction = false): string {
  if (asFraction) {
    return renderFraction(dividend, divisor);
  }
  return `<span class="math-division">${dividend} ÷ ${divisor}</span>`;
}

/**
 * Converts plain text math expressions to formatted HTML
 */
export function parseMathText(text: string): string {
  // Replace fraction notation (a/b) with proper rendering
  text = text.replace(/(\d+)\/(\d+)/g, (match, num, den) => renderFraction(num, den));

  // Replace multiplication (a*b or a×b) with proper symbol
  text = text.replace(/(\d+)\s*\*\s*(\d+)/g, (match, a, b) => renderMultiplication(a, b));
  text = text.replace(/(\d+)\s*×\s*(\d+)/g, (match, a, b) => `${a} × ${b}`);

  // Replace division (a/b with ÷ when not already a fraction)
  text = text.replace(/(\d+)\s*\/\s*(\d+)/g, (match, a, b) => {
    // Only convert if it's not already converted to fraction
    if (!match.includes('<span class="math-fraction">')) {
      return renderDivision(a, b);
    }
    return match;
  });

  // Replace mixed numbers (1 2/3)
  text = text.replace(/(\d+)\s+(\d+)\/(\d+)/g, (match, whole, num, den) => renderMixedNumber(parseInt(whole), parseInt(num), parseInt(den)));

  // Replace equals signs in equations
  text = text.replace(/(\d+(?:\s*\d+\/\d+)?)\s*([+\-×÷])\s*(\d+(?:\s*\d+\/\d+)?)\s*=\s*(\d+(?:\s*\d+\/\d+)?)/g,
    (match, left, op, right, result) => renderEquation(left, op, right, result));

  return text;
}

/**
 * Creates a step-by-step math solution with proper formatting
 */
export function createMathSteps(steps: Array<{
  description: string;
  expression: string;
  explanation?: string;
}>): string {
  return `<div class="math-steps">
${steps.map((step, index) => `
<div class="math-step">
  <div class="step-number">${index + 1}</div>
  <div class="step-content">
    <div class="step-description">${step.description}</div>
    <div class="step-expression">${parseMathText(step.expression)}</div>
    ${step.explanation ? `<div class="step-explanation">${step.explanation}</div>` : ''}
  </div>
</div>`).join('')}
</div>`;
}

/**
 * Creates a visual fraction representation
 */
export function createVisualFraction(fraction: { numerator: number; denominator: number }, visualType: 'pizza' | 'circle' | 'rectangle' = 'pizza'): string {
  const { numerator, denominator } = fraction;
  const filled = visualType === 'pizza' ? '🍕' : visualType === 'circle' ? '🟢' : '🟦';
  const empty = visualType === 'pizza' ? '⚪' : visualType === 'circle' ? '⚪' : '⬜';

  const pieces = filled.repeat(numerator) + empty.repeat(denominator - numerator);

  return `<div class="visual-fraction">
  <div class="fraction-display">${renderFraction(numerator, denominator)}</div>
  <div class="visual-representation">
    <div class="visual-label">${denominator} חלקים שווים:</div>
    <div class="visual-pieces">${pieces}</div>
    <div class="visual-explanation">(לקחתם ${numerator} מתוך ${denominator})</div>
  </div>
</div>`;
}

/**
 * Creates an interactive math problem
 */
export function createInteractiveMathProblem(problem: {
  question: string;
  steps: Array<{
    instruction: string;
    expression: string;
    hint?: string;
  }>;
  finalAnswer: string;
  explanation: string;
}): string {
  return `<div class="interactive-math-problem">
  <div class="problem-question">${parseMathText(problem.question)}</div>
  <div class="problem-steps">
${problem.steps.map((step, index) => `
    <div class="problem-step" data-step="${index + 1}">
      <div class="step-instruction">${step.instruction}</div>
      <div class="step-expression">${parseMathText(step.expression)}</div>
      ${step.hint ? `<div class="step-hint">${step.hint}</div>` : ''}
    </div>`).join('')}
  </div>
  <div class="problem-solution">
    <div class="final-answer">תוצאה: ${parseMathText(problem.finalAnswer)}</div>
    <div class="answer-explanation">${problem.explanation}</div>
  </div>
</div>`;
}

/**
 * Converts any text content to include proper mathematical formatting
 */
export function formatMathContent(content: string): string {
  // Process the entire content
  return parseMathText(content);
}

// CSS styles for math rendering (to be included in global styles)
export const mathStyles = `
.math-fraction {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.9em;
  border-bottom: 1px solid currentColor;
  position: relative;
  margin: 0 2px;
}

.fraction-numerator {
  display: block;
  text-align: center;
  padding-bottom: 2px;
}

.fraction-denominator {
  display: block;
  text-align: center;
  border-top: 1px solid currentColor;
  padding-top: 2px;
}

.math-equation {
  font-family: 'Times New Roman', serif;
  font-weight: bold;
  margin: 0 4px;
}

.math-multiplication, .math-division {
  font-family: 'Times New Roman', serif;
  font-weight: bold;
}

.math-steps {
  margin: 20px 0;
  border-left: 4px solid #3b82f6;
  padding-left: 20px;
}

.math-step {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.step-number {
  background: #3b82f6;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-description {
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 5px;
}

.step-expression {
  font-family: 'Times New Roman', serif;
  font-size: 1.1em;
  background: #f0f9ff;
  padding: 8px 12px;
  border-radius: 6px;
  margin: 5px 0;
  border: 2px solid #3b82f6;
}

.step-explanation {
  color: #6b7280;
  font-style: italic;
  margin-top: 5px;
}

.visual-fraction {
  display: inline-block;
  text-align: center;
  margin: 10px;
  padding: 15px;
  background: #fef3c7;
  border-radius: 8px;
  border: 2px solid #f59e0b;
}

.fraction-display {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.visual-pieces {
  font-size: 2em;
  margin: 10px 0;
  letter-spacing: 2px;
}

.interactive-math-problem {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0284c7;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.problem-question {
  font-size: 1.2em;
  font-weight: bold;
  color: #0c4a6e;
  margin-bottom: 20px;
  text-align: center;
}

.problem-steps {
  margin-bottom: 20px;
}

.problem-step {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 4px solid #0284c7;
}

.step-instruction {
  font-weight: bold;
  color: #0369a1;
  margin-bottom: 8px;
}

.problem-solution {
  background: #ecfdf5;
  border: 2px solid #16a34a;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.final-answer {
  font-size: 1.3em;
  font-weight: bold;
  color: #15803d;
  margin-bottom: 10px;
}
`;

