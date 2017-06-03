import * as sinon from 'sinon';
import { expect } from 'chai';
import { Server } from '../../server/server';
import { Observable } from 'rxjs/Observable';

class TestServer extends Server {
    public listen(callback: () => void) {}
    public close() {}
}

describe('Server', () => {
    const server = new TestServer();
    const callback = () => {},
        pattern = { test: 'test' };

    describe('add', () => {
        it(`should add handler as a stringified pattern key`, () => {
            server.add(pattern, callback as any);

            const handlers = server.getHandlers();
            expect(handlers[JSON.stringify(pattern)]).to.equal(callback);
        });
    });
    describe('send', () => {
        let stream$: Observable<string>;
        let sendSpy: sinon.SinonSpy;
        beforeEach(() => {
            stream$ = Observable.of('test');
        });
        describe('when stream', () => {
            beforeEach(() => {
                sendSpy = sinon.spy();
            });
            describe('throws exception', () => {
                beforeEach(() => {
                    server.send(Observable.throw('test'), sendSpy);
                });
                it('should send error', () => {
                    expect(sendSpy.calledWith({ err: 'test', response: null })).to.be.true;
                });
                it('should send "complete" event', () => {
                    expect(sendSpy.calledWith({ disposed: true })).to.be.true;
                });
            });
            describe('emits response', () => {
                beforeEach(() => {
                    server.send(stream$, sendSpy);
                });
                it('should send response', () => {
                    expect(sendSpy.calledWith({ err: null, response: 'test' })).to.be.true;
                });
                it('should send "complete" event', () => {
                    expect(sendSpy.calledWith({ disposed: true })).to.be.true;
                });
            });
        });
    });
});