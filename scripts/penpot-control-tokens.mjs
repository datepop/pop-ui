// These are the component properties governed by the first shared control tokens.
// A slot is selected by its role and state so equal-valued icons and backgrounds stay independent.
export function controlBindings(component, master, layers) {
  const { name } = component;
  if (!['Button', 'Dropdown', 'TextField', 'SearchBar'].includes(name)) return [];
  const props = Object.fromEntries(
    (component.variantProperties ?? []).map(({ name, value }) => [name, value]),
  );
  const { size, state } = props;
  const height = 'size.control.' + size;
  if (name === 'Button') {
    const bindings = [[master, 'height', height]];
    if (size === 'md') {
      const labels = layers.filter((layer) => layer.name === 'Label' && layer.type === 'text');
      if (labels.length !== 1) throw new Error('Expected one medium Button label: ' + master.id);
      bindings.push([labels[0], 'typography', 'typography.control.label.md']);
    }
    if (props.variant === 'primary' && ['default', 'loading', 'loadingWithLabel'].includes(state))
      bindings.push([master, 'fill', 'color.action.primary.background']);
    return bindings;
  }

  if (name === 'SearchBar' && state !== 'error') return [];
  const fieldLayer = name === 'Dropdown' ? 'Field' : 'Input-input';
  const findLayer = (type, layerName) => {
    const matches = layers.filter((s) => s.type === type && s.name === layerName);
    if (matches.length !== 1)
      throw new Error(`Expected one ${name} ${type} ${layerName} (${master.id})`);
    return matches[0];
  };
  const field = findLayer('rect', fieldLayer);
  const bindings = [];
  if (state === 'error') {
    const messages = layers.filter((s) => s.type === 'text' && s.name === 'InputWrapper-error');
    if (messages.filter((s) => !s.hidden).length !== 1)
      throw new Error('Expected one visible error message: ' + master.id);
    bindings.push([field, 'strokeColor', 'color.border.error']);
    for (const message of messages) bindings.push([message, 'fill', 'color.text.error']);
  }
  if (name !== 'SearchBar' && props.type !== 'textarea') bindings.push([field, 'height', height]);
  if (state !== 'disabled' && state !== 'error') {
    const borderState = state === 'hover' || state === 'focus' ? state : 'default';
    if (name === 'Dropdown' && state === 'keyboardFocus') {
      bindings.push([findLayer('rect', 'Focus ring'), 'strokeColor', 'color.aqua.800']);
    } else {
      bindings.push([field, 'strokeColor', 'color.border.' + borderState]);
    }
    if (name === 'Dropdown' || ['default', 'hover', 'focus'].includes(state)) {
      const placeholder = findLayer('text', name === 'Dropdown' ? 'Placeholder' : fieldLayer);
      bindings.push([placeholder, 'fill', 'color.text.placeholder']);
    }
  }
  return bindings;
}

export function inspectControlTokens(file, page) {
  const bindings = {};
  const global = file.data.tokensLib?.global;
  for (const component of Object.values(file.data.components)) {
    if (component.deleted || component.mainInstancePage !== page.id) continue;
    const master = page.objects[component.mainInstanceId];
    const children = (master.shapes ?? []).map((id) => page.objects[id]);
    for (const [shape, property, token] of controlBindings(component, master, children)) {
      if (shape.appliedTokens?.[property] !== token)
        throw new Error(
          `Expected ${token} on ${component.name} / ${shape.name}.${property} (${shape.id})`,
        );
      const definition = token.split('.').reduce((entry, key) => entry?.[key], global);
      if (!definition) throw new Error('Undefined Penpot token: ' + token);
      bindings[token] ??= { type: definition.$type, value: definition.$value, bindings: 0 };
      bindings[token].bindings++;
    }
  }
  return Object.fromEntries(Object.entries(bindings).sort(([a], [b]) => a.localeCompare(b)));
}
