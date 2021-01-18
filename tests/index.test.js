import {
  a,
  an,
  checkIf,
  remove,
  removeAll,
} from '../src/index';

describe('All tests', () => {
  beforeEach(() => removeAll());

it('should allow generic actions', () => {
    a('bird').can('fly');

    expect(
      checkIf('bird').can('fly'),
    ).toBe(true);
  });
it('should allow known actions for registered roles', () => {
    a('person').can('drive')('cars');

    expect(
      checkIf('person').can('drive')('cars'),
    ).toBe(true);
  });

it('should not allow actions for non-registered roles', () => {
    expect(
      checkIf('person').can('drive')('cars'),
    ).toBe(false);
  });

it('should not allow unknown actions for registered roles', () => {
    a('person').can('drive')('cars');

    expect(
      checkIf('person').can('drive')('trains'),
    ).toBe(false);
  });

it('should allow multiple actions for registered roles', () => {
    a('person').can('drive')('cars');
    a('person').can('ride')('bicycles');

    expect(
      checkIf('person').can('drive')('cars'),
    ).toBe(true);

    expect(
      checkIf('person').can('ride')('bicycles'),
    ).toBe(true);
  });

it('should allow multiple targets for the same action for registered roles', () => {
    a('person').can('drive')('cars');
    a('person').can('drive')('trains');

    expect(
      checkIf('person').can('drive')('cars'),
    ).toBe(true);

    expect(
      checkIf('person').can('drive')('trains'),
    ).toBe(true);
  });

it('should allow conditional actions with legal values', () => {
    a('person').can('buy')('phones').when(savings => savings > 1000);

    expect(
      checkIf('person').can('buy')('phones').with(1500),
    ).toBe(true);
  });

it('should not allow conditional actions with illegal values', () => {
    a('person').can('buy')('phones').when(savings => savings > 1000);

    expect(
      checkIf('person').can('buy')('phones').with(800),
    ).toBe(false);
  });

it('should be able to delete a role', () => {
    an('admin').can('create')('users');
    remove('admin');

    expect(
      checkIf('admin').can('create')('users'),
    ).toBe(false);
  });

it('should be able star an action', () => {
    an('admin').can('*')('users');

    expect(
      checkIf('admin').can('create')('users'),
    ).toBe(true);

    expect(
      checkIf('admin').can('delete')('users'),
    ).toBe(true);
  });

it('should be able star a target', () => {
    an('admin').can('create')('*');

    expect(
      checkIf('admin').can('create')('users'),
    ).toBe(true);

    expect(
      checkIf('admin').can('create')('posts'),
    ).toBe(true);
  });

it('should be able star actions and targets', () => {
    an('admin').can('*')('*');

    expect(
      checkIf('admin').can('create')('users'),
    ).toBe(true);

    expect(
      checkIf('admin').can('delete')('posts'),
    ).toBe(true);
  });
});
