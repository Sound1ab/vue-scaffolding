export function transition(machine, {commit, state, dispatch}, {type, params, extState}) {
    const nextState = machine.transition(state.state, {type, params}, extState);

    commit(`${machine.config.id.toUpperCase()}_TRANSITION`, nextState.value);

    nextState.actions.forEach(actionKey => {
        dispatch(actionKey, {type, params, history: nextState.history});
    });
}
