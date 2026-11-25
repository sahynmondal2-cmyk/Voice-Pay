import { DemoTransaction } from '../types';

export class NotificationService {
  private sentNotificationIds = new Set<string>();

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return 'denied';
    }
  }

  /**
   * Dispatch system notification for confirmed transactions.
   * Runs in tandem with vocal announcement to provide dual visual + audio alert.
   */
  public async notifyTransaction(txn: DemoTransaction): Promise<boolean> {
    if (!this.isSupported() || this.getPermission() !== 'granted') {
      return false;
    }

    if (txn.status !== 'Demo Successful') {
      return false;
    }

    if (txn.id && this.sentNotificationIds.has(txn.id)) {
      return false;
    }

    const isOutgoing = txn.direction === 'outgoing';
    const amountStr = `₹${txn.amount.toLocaleString('en-IN')}`;
    const personName = isOutgoing
      ? (txn.recipientName || txn.customerName || 'Recipient')
      : (txn.senderName || txn.customerName || 'Customer');

    const title = isOutgoing
      ? `PayVoice — ${amountStr} Sent`
      : `PayVoice — ${amountStr} Received`;

    const body = isOutgoing
      ? `Paid to ${personName} • Verified Demo Transfer`
      : `Received from ${personName} • Instant Soundbox Verified`;

    try {
      // If service worker is ready, use registration.showNotification for richer background support
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.showNotification) {
          await reg.showNotification(title, {
            body,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: `txn-${txn.id}`,
            data: { txnId: txn.id, url: '/transactions' },
          });
          if (txn.id) this.sentNotificationIds.add(txn.id);
          return true;
        }
      }

      // Fallback to standard web Notification
      const notification = new Notification(title, {
        body,
        icon: '/icon-192.png',
        tag: `txn-${txn.id}`,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      if (txn.id) this.sentNotificationIds.add(txn.id);
      return true;
    } catch (err) {
      console.warn('Could not display system notification:', err);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
