import { runFromFile } from '@stepci/runner';
import { join } from 'path';

test('Check Response Status', async () => {
  const { result } = await runFromFile(join(__dirname, 'workflow.yml'));
  if (!result.passed) {
    result.tests.forEach((test) => {
      test.steps.forEach((step, i) => {
        if (!step.passed) {
          console.error(
            `${test.name || ''} (${test.id}) failed on step #${i}`,
            step,
          );
        }
        expect(step.passed).toBe(true);
      });
    });
  }
  expect(result.passed).toBe(true);
});

